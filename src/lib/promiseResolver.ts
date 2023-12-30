export class PromiseResolver {
  async resolve(promise) {
    try {
      const data = await promise;
      return [data, null];
    } catch (error) {
      return [null, error.message];
    }
  }
}
