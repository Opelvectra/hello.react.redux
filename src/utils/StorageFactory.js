class StorageFactory {
  static getObject(objectName) {
    try{
      return JSON.parse(window.localStorage[objectName]);
    } catch(e){
      return null;
    }
  }

  static saveObject(objectName, value) {
    try{
      let result = Object.assign({}, this.getObject(objectName), value);
      window.localStorage[objectName] = JSON.stringify(result);
      return result;
    } catch(e){
      return null;
    }
  }

  static removeObject(objectName) {
    try{
      return delete window.localStorage[objectName];
    } catch(e){
      return null;
    }
  }
}

export default StorageFactory;
