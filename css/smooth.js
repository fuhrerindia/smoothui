/*
(c) Created By Paurush Sinha
    https://www.github.com/fuhrerindia/
*/

const smoothUI = {
    createElement: (tagName, attributes, children) => {
        const element = document.createElement(tagName);
        Object.keys(attributes).forEach((item) => {
            element.setAttribute(item, attributes[item]);
        });
        if (typeof children === 'string') {
            element.innerText = children;
        } else if (typeof children === 'object') {
            children.forEach(i => {
                element.appendChild(i);
            });
        } else {
            element.append(children);
        }
        return element;
    },
    kebabize: (txt) => txt.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
    css: (styles) => {
        let newStyle = "";
        Object.keys(styles).forEach(item => {
            newStyle = `${newStyle}${smoothUI.kebabize(item)}:${styles[item]};`
        });
        return newStyle;
    },
    switchState: (e) => e.target.getAttribute('data-checked') === 'off' ? true : false,
    switchStateBySelector: (selector) => $1(selector).getAttribute('data-checked') === 'off' ? false : true,
};

const $1 = (selector) => document.querySelector(selector);



window.addEventListener("load", function () {
    // DRAW RADIO BUTTON
    const radioElements = document.querySelectorAll(".switch");
    radioElements.forEach((radioParent) => {
        const div = smoothUI.createElement('div', {}, []);
        let checkval = undefined;
        radioParent.appendChild(div);
        if (radioParent.getAttribute('data-checked') === null) {
            radioParent.setAttribute('data-checked', 'off');
        } else if (radioParent.getAttribute('data-checked') === 'on') {
            checkval = '';
            radioParent.classList.add('switch-on');
            div.classList.add('radio-enabled');
        }
        const checkbox = smoothUI.createElement('input', { type: 'checkbox', 'class': 'no-display' }, []);
        if (checkval === '') {
            checkbox.setAttribute('checked', '');
        }
        if (radioParent.getAttribute('data-name') !== null) {
            checkbox.setAttribute('name', radioParent.getAttribute('data-name'));
        }

        if (radioParent.getAttribute('data-required') !== null) {
            checkbox.setAttribute('required', '');
        }

        radioParent.appendChild(checkbox);

        radioParent.addEventListener('click', () => {
            const checkMarker = radioParent.querySelector('input');
            if (checkMarker.checked) {
                checkMarker.checked = false;
                radioParent.querySelector('div').classList.remove('radio-enabled');
                radioParent.classList.remove('switch-on');
                radioParent.setAttribute('data-checked', 'off');
                checkMarker.removeAttribute('checked');
            } else {
                checkMarker.checked = true;
                radioParent.querySelector('div').classList.add('radio-enabled');
                radioParent.classList.add('switch-on');
                radioParent.setAttribute('data-checked', 'on');
                checkMarker.setAttribute('checked', '');
            }
        });

    });

    const accords = document.querySelectorAll('.accordion');
    accords.forEach(accord => {
        const content = accord.innerHTML.replaceAll('\n', '');
        const title = accord.getAttribute('data-title');

        const finalAccordion = smoothUI.createElement('div', { class: 'accord' }, [
            smoothUI.createElement('div', { class: 'accord-title' }, title),
            smoothUI.createElement('div', { class: 'accord-content', style: smoothUI.css({ display: 'none' }) }, content)
        ]);
        finalAccordion.addEventListener('click', () => {
            if (finalAccordion.getElementsByClassName("accord-content")[0].style.display === 'none') {
                finalAccordion.getElementsByClassName("accord-content")[0].style.display = 'block';
            } else {
                finalAccordion.getElementsByClassName("accord-content")[0].style.display = 'none';
            }
        });
        accord.innerHTML = "";
        accord.append(finalAccordion);
    });
});