function formatDate(dateString) {
    if(!dateString) {
        return '';
        }
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}, ${dayOfWeek}`;
  }
  
//   const dateString = '2024-12-04T22:44:35.916Z';
//   const formattedDate = formatDate(dateString);
//   console.log(formattedDate); // Output: 2024/12/04 22:44:35 Wednesday

  function formatTime(dateString) {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${minutes} ${ampm}`;
  
    return strTime;
  }
  
//   const dateString = '2024-12-04T22:44:35.916Z';
//   const formattedTime = formatTime(dateString);
//   console.log(formattedTime); // Output: 22:44
  




  export{
    formatDate,
    formatTime
  };