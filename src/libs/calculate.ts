export class Calculator {
  add(a: number, b: number): number {
    const result = a + b;
    return result;
  }

  subtract(a: number, b: number): number {
    const result = a - b;
    if (result < 0) {
      return 0;
    } else {
      return result;
    }
  }
}
