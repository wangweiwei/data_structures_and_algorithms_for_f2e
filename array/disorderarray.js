/*
 * ⚠️代码仅供学习数据结构和算法，不可用在生产环境
 * 约定：
 *   1、undefined代表空元素，也就是当前数组中没有元素
 *   2、null代表标记为删除的元素，实际尚未删除，只是标记删除，等数组存储满了，会进行清除
 * 无序数组
 */
class DisorderArray {
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
   *  1、将第index位置的元素移到数组最后
   *  2、将元素插入第index位置
   * @param index {int} 插入的位置
   * @param element {Number} 插入的元素
   */
  add(index, element) {
    // 如果已经满了，则清理已标记删除的元素
    if(this.length > this.max - 1) {
      this.sweep();
    }

    // 如果实际数组占用的大小大于数组容器的大小，则报错
    if(this.length > this.max - 1 || index > this.max - 1) {
      throw new Error('array index out of bounds exception!');
    }

    if(element === undefined) {
      element = index;
      index = this.length;
    }

    if(this.items[index] !== undefined && this.items[index] !== null) {
      // 将第index位置的元素移到数组最后(当前元素个数的后面)
      if(index >= this.length) {
        this.items[this.length - 1] = this.items[index];
      } else {
        this.items[this.length] = this.items[index];
      }
    }
    // 将元素插入第index位置
    this.items[index] = element;

    // 改变数组个数
    this.length++;
  }

  /*
   * 删除操作
   *  1、先标记删除
   *  2、再次存储时如果没有空间了再进行删除
   * @param index {int} 删除的位置
   * @return {Boolean} 成功与否
   */
  remove(index) {
    if(this.items[index] !== undefined && this.items[index] !== null) {
      // 将数组标记为删除(不会修改length值)
      this.items[index] = null;
      return true;
    }
    return false;
  }

  /*
   * 清除已标记删除的元素
   */
  sweep() {
    // 时间换空间
    var len = this.length;
    // 将所有的已标记删除的元素删除
    for(let i = 0; i < len; i++) {
      if(this.items[i] === null) {
        this.items[i] = undefined;
        this.length--;
      }
    }
    // 没有元素的位置，将元素左移填充位置
    for(let i = 0; i < len; i++) {
      if(this.items[i] === undefined) {
        for(let j = i + 1; j < len; j++) {
          if(this.items[j] !== undefined) {
            this.items[i] = this.items[j];
            this.items[j] = undefined;
            break;
          }
        }
      }
    }
    // 置空操作
    /*
    // 空间换时间
    var temp = new DisorderArray(this.max);
    var len = this.length;
    for(let i = 0; i < len; i++) {
      if(this.items[i] === null){
        this.items[i] = undefined;
        this.length--;
      }
      if(this.items[i] !== undefined) {
        temp.add(this.items[i])
      }
    }
    this.items = temp.items;
    */
  }
}
