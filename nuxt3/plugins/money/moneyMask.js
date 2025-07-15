import { format, setCursor, event } from './util'
import assign from './assign'
import defaults from './options'

function moneyMask(element, binding) {
    if (!binding.value) return
    const option = assign(defaults, binding.value)

    let inputElement = element
    if (element.tagName.toLocaleUpperCase() !== 'INPUT') {
        let inputs = element.getElementsByTagName('input')
        if (inputs.length === 1) {
            inputElement = inputs[0]
        } else if (inputs.length === 0) {
            const findInput = () => {
                inputs = element.getElementsByTagName('input')
                if (inputs.length >= 1) {
                    inputElement = inputs[0]
                    return true
                }
                return false
            }

            if (!findInput()) {
                setTimeout(() => {
                    if (findInput()) {
                        applyMask(inputElement, option)
                    }
                }, 100)
                return
            }
        } else {
            inputElement = inputs[0]
        }
    }

    applyMask(inputElement, option)
}

function applyMask(element, option) {
    if (!element) return

    element.oninput = function() {
        let positionFromEnd = element.value.length - element.selectionEnd
        element.value = format(element.value, option)
        positionFromEnd = Math.max(positionFromEnd, option.suffix.length)
        positionFromEnd = element.value.length - positionFromEnd
        positionFromEnd = Math.max(positionFromEnd, option.prefix.length + 1)
        setCursor(element, positionFromEnd)
        element.dispatchEvent(event('onchange'))
    }
    element.onfocus = function() {
        setCursor(element, element.value.length - option.suffix.length)
    }
    element.oninput()
    element.dispatchEvent(event('input'))
}

export default moneyMask
