export interface NetworkModel {
    id: string;
    name: string;
    description: string;
}

export interface CreateNetworkDTO {
    name: string;
    description: string;
}

export interface UpdateNetworkDTO {
    name?: string;
    description?: string;
}
