function reduseText(text, num) {
  let newText
  if (text.length > 20) {
    newText = text.slice(0, 20)
  } else {
    const newArr = text.split(' ').slice(0, num)

    newText = newArr.join(' ')
  }

  return `${newText}...`
}
export default reduseText
