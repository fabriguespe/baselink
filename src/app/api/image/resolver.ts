import { isAddress } from "viem";

export const converseEndpointURL = "https://converse.xyz/profile/";
export type InfoCache = Map<string, UserInfo>;
export type ConverseProfile = {
  address: string | null;
  onXmtp: boolean;
  avatar: string | null;
  formattedName: string | null;
  name: string | null;
};
export type UserInfo = {
  ensDomain?: string | undefined;
  address?: string | undefined;
  preferredName: string | undefined;
  converseUsername?: string | undefined;
  ensInfo?: EnsData | undefined;
  avatar?: string | undefined;
  converseEndpoint?: string | undefined;
};

export interface EnsData {
  address?: string;
  avatar?: string;
  avatar_small?: string;
  converse?: string;
  avatar_url?: string;
  contentHash?: string;
  description?: string;
  ens?: string;
  ens_primary?: string;
  github?: string;
  resolverAddress?: string;
  twitter?: string;
  url?: string;
  wallets?: {
    eth?: string;
  };
}

let infoCache: InfoCache = new Map();

export const getUserInfo = async (
  key: string,
  clientAddress?: string
): Promise<UserInfo | null> => {
  try {
    // Validate inputs
    if (!key && !clientAddress) {
      throw new Error("No key or client address provided.");
    }

    let data: UserInfo = infoCache.get(key) || {
      ensDomain: undefined,
      address: undefined,
      converseUsername: undefined,
      ensInfo: undefined,
      avatar: undefined,
      converseEndpoint: undefined,
      preferredName: undefined,
    };

    // Determine user information based on provided key
    if (isAddress(clientAddress || "")) {
      data.address = clientAddress;
    } else if (isAddress(key || "")) {
      data.address = key;
    } else if (key.includes(".eth")) {
      data.ensDomain = key;
    } else if (["@user", "@me", "@bot"].includes(key)) {
      data.address = clientAddress;
      data.ensDomain = key.replace("@", "") + ".eth";
      data.converseUsername = key.replace("@", "");
    } else if (key === "@alix") {
      data.address = "0x3a044b218BaE80E5b9E16609443A192129A67BeA";
      data.converseUsername = "alix";
    } else if (key === "@bo") {
      data.address = "0xbc3246461ab5e1682baE48fa95172CDf0689201a";
      data.converseUsername = "bo";
    } else {
      data.converseUsername = key;
    }

    data.preferredName = data.ensDomain || data.converseUsername || "Friend";
    const keyToUse = data.address || data.ensDomain || data.converseUsername;

    if (!keyToUse) {
      throw new Error(
        "Unable to determine a valid key for fetching user info."
      );
    }

    // Check cache for existing data
    const cacheData = infoCache.get(keyToUse);
    if (cacheData) {
      return cacheData;
    }

    // Fetch data based on ENS domain or Converse username
    if (keyToUse.includes(".eth")) {
      // Fetch ENS data
      try {
        const response = await fetch(`https://ensdata.net/${keyToUse}`);
        if (!response.ok) {
          console.error(
            `ENS data request failed with status ${response.status}`
          );
          // throw new Error(
          //   `ENS data request failed with status ${response.status}`,
          // );
        }
        const ensData = (await response.json()) as EnsData;
        if (ensData) {
          data.ensInfo = ensData;
          data.ensDomain = ensData.ens || data.ensDomain;
          data.address = ensData.address || data.address;
          data.avatar = ensData.avatar_url || data.avatar;
        }
      } catch (error) {
        console.error("Failed to fetch ENS data:", error);
      }
    } else {
      // Fetch Converse profile data
      try {
        const username = keyToUse.replace("@", "");
        const converseEndpoint = `${converseEndpointURL}${username}`;
        const response = await fetchWithTimeout(
          converseEndpoint,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ peer: username }),
          },
          5000
        );
        if (!response.ok) {
          throw new Error(
            `Converse profile request failed with status ${response.status}`
          );
        }
        const converseData = (await response.json()) as ConverseProfile;
        if (converseData) {
          data.converseUsername =
            converseData.formattedName ||
            converseData.name ||
            data.converseUsername;
          data.address = converseData.address || data.address;
          data.avatar = converseData.avatar || data.avatar;
          data.converseEndpoint = converseEndpoint;
        }
      } catch (error) {
        console.error("Failed to fetch Converse profile:", error);
      }
    }

    data.preferredName = data.ensDomain || data.converseUsername || "Friend";
    infoCache.set(keyToUse, data);
    return data;
  } catch (error) {
    return null;
  }
};
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 5000
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};
