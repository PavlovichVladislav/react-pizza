const debounce = (func, ms) => {
   let timerId;

   return function () {
      const funcCall = () => {
         func.apply(this, arguments);
      };

      clearTimeout(timerId);

      timerId = setTimeout(funcCall, ms);
   };
};

export default debounce;
