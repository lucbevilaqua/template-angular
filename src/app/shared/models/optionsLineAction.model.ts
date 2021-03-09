
class OptionsLineAction {
   btnStyle?: any;
   disabled?: any;
   condition?: any;
   title?: any;

   constructor() {
      this.btnStyle = null;
      this.disabled = () => false;
      this.condition = () => true;
      this.title = () => '';
   }
}

export default OptionsLineAction;
