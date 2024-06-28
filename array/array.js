const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const number = 2;

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    if (chunk.length === chunkSize) {
      result.push(chunk);
    }
  }
  return result;
}

const output = chunkArray(data, number);
console.log(output);
