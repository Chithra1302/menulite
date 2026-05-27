export class BaseRepository<T extends { id: string }> {
  protected items: T[] = [];

  findAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(item: T): T {
    this.items.push(item);

    return item;
  }

  delete(id: string): boolean {
    const index = this.items.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);

    return true;
  }
}