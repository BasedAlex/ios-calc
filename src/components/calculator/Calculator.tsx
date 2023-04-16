import { useState } from 'react'
import styles from './Calculator.module.css'

export const Calculator = () => {
	const [calc, setCalc] = useState('0')
	const [count, setCount] = useState(0)

	const onInput = (e: any) => {
		calc !== '0'
			? setCalc(calc + e.target.innerText)
			: setCalc(e.target.innerText)
	}

	const onClear = () => {
		setCalc('0')
	}

	const operationCalculate = (a: string, op: string, b: string) => {
		if (op === '*') return +a * +b
		if (op === '/') return +a / +b
		if (op === '+') return +a + +b
		if (op === '-') return +a - +b
	}

	const onOperationTwo = () => {
		const stack = ['*', '/', '+', '-']
		let i = 0
		let result = calc

		while (i < stack.length) {
			const regex = result.match(RegExp(`([0-9]+)(\\${stack[i]})([0-9]+)`))
			const arr: any = regex

			if (arr) {
				const t: any = operationCalculate(arr[1], arr[2], arr[3])
				let calculated = result.replace(arr[0], t)
				console.log('arr', arr)
				console.log('result', t, typeof t)
				console.log('calculated', calculated)
				i++
			} else if (!arr) {
				i++
			}
		}

		// setCalc(result.toString())
		// const re = /([0-9]+)(\*)([0-9]+)/

		// const operation = '*'
		// console.log(calc.match(RegExp(`([0-9]+)(\\${operation})([0-9]+)`)))
	}

	const onOperation = () => {
		if (calc.includes('+')) {
			const index = calc.indexOf('+')
			const result =
				Number(calc.slice(0, index)) +
				Number(calc.slice(index + 1, calc.length))
			setCalc(result.toString())
		}

		if (calc.includes('-')) {
			const index = calc.indexOf('-')
			const result =
				Number(calc.slice(0, index)) -
				Number(calc.slice(index + 1, calc.length))
			setCalc(result.toString())
		}

		if (calc.includes('*')) {
			const index = calc.indexOf('*')
			const result =
				Number(calc.slice(0, index)) *
				Number(calc.slice(index + 1, calc.length))
			setCalc(result.toString())
		}

		if (calc.includes('/')) {
			const index = calc.indexOf('/')
			const result =
				Number(calc.slice(0, index)) /
				Number(calc.slice(index + 1, calc.length))
			setCalc(result.toString())
		}
	}

	return (
		<>
			<div className={styles.display}>{calc}</div>
			<div className={styles.wrapper}>
				<div className={styles.button__grey} onClick={e => onInput(e)}>
					(
				</div>
				<div className={styles.button__grey} onClick={e => onInput(e)}>
					)
				</div>
				<div className={styles.button__grey} onClick={e => onInput(e)}>
					%
				</div>
				<div className={styles.button__orange} onClick={onClear}>
					AC
				</div>

				<div className={styles.button__black} onClick={e => onInput(e)}>
					7
				</div>
				<div className={styles.button__black} onClick={e => onInput(e)}>
					8
				</div>
				<div className={styles.button__black} onClick={e => onInput(e)}>
					9
				</div>
				<div className={styles.button__orange} onClick={e => onInput(e)}>
					+
				</div>

				<div className={styles.button__black} onClick={e => onInput(e)}>
					4
				</div>
				<div className={styles.button__black} onClick={e => onInput(e)}>
					5
				</div>
				<div className={styles.button__black} onClick={e => onInput(e)}>
					6
				</div>
				<div className={styles.button__orange} onClick={e => onInput(e)}>
					*
				</div>

				<div className={styles.button__black} onClick={e => onInput(e)}>
					1
				</div>
				<div className={styles.button__black} onClick={e => onInput(e)}>
					2
				</div>
				<div className={styles.button__black} onClick={e => onInput(e)}>
					3
				</div>
				<div className={styles.button__orange} onClick={e => onInput(e)}>
					-
				</div>

				<div className={styles.button__black} onClick={e => onInput(e)}>
					0
				</div>
				<div className={styles.button__black}>.</div>
				<div className={styles.button__black} onClick={onOperationTwo}>
					=
				</div>
				<div className={styles.button__orange} onClick={e => onInput(e)}>
					/
				</div>
			</div>
		</>
	)
}
