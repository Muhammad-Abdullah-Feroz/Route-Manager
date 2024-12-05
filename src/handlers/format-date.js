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
  
  const dateString = '2024-12-04T22:44:35.916Z';
  const formattedDate = formatDate(dateString);
  console.log(formattedDate); // Output: 2024/12/04 22:44:35 Wednesday




  export default formatDate;