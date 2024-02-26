type ProviderKey = "name" | "url" | "id" ;

type providers = Array<Record<ProviderKey, string>>;

export interface ApiResponse<T> {
    status: ApiStatus;
    data: T;
    errors?: ApiErrors[];
  }
  
  export interface ApiStatus {
    code: number;
    message: string;
  }
  
  export interface ApiErrors {
    code: string;
    userMessage: string;
    internalMessage: string;
    timeStamp: string;
    uri: string;
  }

  