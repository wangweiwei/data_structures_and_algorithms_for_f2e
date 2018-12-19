/*
 * ⚠️代码仅供学习数据结构和算法，不可用在生产环境
 * 约定：
 *   1、undefined代表空元素，也就是当前数组中没有元素
 *   2、null代表标记为删除的元素，实际尚未删除，只是标记删除，等数组存储满了，会进行清除
 * 有序数组
 */
class OrderArray {
  /*
   * 构造函数
   * @param max {int}  数组元素的最大个数，也就是数组容器的最大容量
   */
  constructor(max) {
    // 存储数组元素的容器，可以是{}，也可以是[]
    this.items = {}; // this.items = [];
    // 数组元素的最大个数，也就是数组容器的最大容量
    this.max = max;
    // 数组元素的个数
    this.length = 0;
  }

  /*
   * 插入操作
   * @param element {Number} 插入的元素
   * @return {Boolean} 成功与否
   */
  add(element) {
    // 如果实际数组占用的大小大于数组容器的大小，则报错
    if(this.length > this.max - 1) {
      throw new Error('array index out of bounds exception!');
    }

    // 根据顺序判断可以插入的位置
    var index = 0;
    for(; index < this.length; index++) {
      if(this.items[index] > element) {
        break;
      }
    }

    // 将数组右移一位
    for(let i = this.length; i > index; i--) {
      this.items[i] = this.items[i - 1];
    }

    // 插入元素
    this.items[index] = element;

    // 改变数组个数
    this.length++;
  }

  /*
   * 删除操作
   * @param index {int} 删除的位置
   * @return {Boolean} 成功与否
   */
  remove(index) {
    if(this.items[index] !== undefined) {
      // 将第index + 1的位置的元素左移一位
      for(let i = index; i < this.length - 1; i++) {
        this.items[i] = this.items[i + 1];
      }

      // 将最后的元素置空
      this.items[this.length - 1] = undefined;

      // 改变元素个数
      this.length--;
      return true;
    }
    return false;
  }
}
