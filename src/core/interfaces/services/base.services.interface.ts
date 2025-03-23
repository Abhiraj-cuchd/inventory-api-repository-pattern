export interface BaseService<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    create(dto: any): Promise<T>;
    update(id: string, dto: any): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}