const a = 0.9;
const b = 1;
// Define the function f(x, y) = cos(y) - a * x + b
function f(x, y) {
    return Math.cos(y) - a * x + b;
}

// Функція прямого методу ейлера
function forwardEuler(h, x0, y0, xEnd) {
    let x = x0;
    let y = y0;
    const results = [{ x, y }];

    while (x < xEnd) {
        y += h * f(x, y);
        x += h;
        results.push({ x, y });
    }

    return results;
}

// зворотній метод ейлера
function backwardEuler(h, x0, y0, xEnd) {
    let x = x0;
    let y = y0;
    const results = [{ x, y }];

    function g(x, y_new, y_old) {
        return y_new - y_old - h * f(x + h, y_new);
    }

    while (x < xEnd) {
        let y_new = y;
        let y_old;
        do {
            y_old = y_new;
            y_new = y_old - g(x, y_old, y) / (1 - h * (-Math.sin(y_old)));
        } while (Math.abs(y_new - y_old) > 1e-6);

        y = y_new;
        x += h;
        results.push({ x, y });
    }

    return results;
}

// метода Ругана-Кутта
function rungeKuttaMethod(h, x0, y0, xEnd) {
    let x = x0;
    let y = y0;
    const results = [{ x, y }];

    while (x < xEnd) {
        const k1 = h * f(x, y);
        const k2 = h * f(x + h / 2, y + k1 / 2);
        const k3 = h * f(x + h / 2, y + k2 / 2);
        const k4 = h * f(x + h, y + k3);

        y += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        x += h;
        results.push({ x, y });
    }

    return results;
}
function printConciseResults(method, h, results) {
    const initial = results[0];
    const midpoint = results[Math.floor(results.length / 2)];
    const final = results[results.length - 1];

    console.log(`Результат ${method} для  h=${h}`);
    console.log(`Початок: x = ${initial.x.toFixed(2)}, y = ${initial.y.toFixed(6)}`);
    console.log(`Середнє значення: x = ${midpoint.x.toFixed(2)}, y = ${midpoint.y.toFixed(6)}`);
    console.log(`Результат: x = ${final.x.toFixed(2)}, y = ${final.y.toFixed(6)}`);
    console.log('----------------------------------');
}

const x0 = 0;
const y0 = 1;
const xEnd = 2;
const stepSizes = [0.05, 0.1];
stepSizes.forEach(h => {
    const forwardEulerResults = forwardEuler(h, x0, y0, xEnd);
    const backwardEulerResults = backwardEuler(h, x0, y0, xEnd);
    const rungeKuttaResults = rungeKuttaMethod(h, x0, y0, xEnd);

    printConciseResults('Прямого метода Ейлера', h, forwardEulerResults);
    printConciseResults('Зворитнього метод Ейлера', h, backwardEulerResults);
    printConciseResults('метода Ругана-Кутта', h, rungeKuttaResults);
});
