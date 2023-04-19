import { useState } from 'react'
import styles from './Calculator.module.css'

export const Calculator = () => {
	const [calc, setCalc] = useState('0')
	const [count, setCount] = useState(0)
	const [openhistory, setOpenhistory] = useState(false)
	const [history, setHistory] = useState<string[]>([])

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

	const onParentases = (str: string) => {
		console.log('>>>', str)
		if (str.includes('(') || str.includes(')')) {
			const re = /\(.+\)/
			return str.replace(re, (match: any, i: any) => {
				const newstr = match.slice(1, match.length - 1)
				const prefix = newstr.slice(0, newstr.indexOf('('))
				const postfix = newstr.slice(newstr.indexOf('('))
				return operationCalculate(prefix + onParentases(postfix))
			})
		}
		return str
	}

	const onOperationTwo = () => {
		const stack = ['*', '/', '+', '-']
		let i = 0
		let result = onParentases(calc)

		while (i < stack.length) {
			const regex = result.match(RegExp(`([0-9]+)(\\${stack[i]})([0-9]+)`))
			const arr: any = regex

			if (arr) {
				const t: any = operationCalculate(arr[1], arr[2], arr[3])
				result = result.replace(arr[0], t)
				console.log('arr', arr)
				console.log('result', t, typeof t)
			} else if (!arr) {
				i++
			}
			setCalc(result.toString())
			setHistory([...history, calc + '=' + result])
		}
	}

	const handleDelete = (e: any) => {
		if (e.code === 'Backspace' && calc.length > 1) {
			setCalc(calc.slice(-calc.length, calc.length - 1))
		}
		if (e.code === 'Backspace' && calc.length === 1) {
			setCalc('0')
		}
	}

	return (
		<div tabIndex={0} onKeyUpCapture={e => handleDelete(e)}>
			<div className={styles.display}>
				<button
					className={(styles.button__trigger, styles.button__rotate)}
					onClick={() => setOpenhistory(!openhistory)}
				>
					{' '}
					<svg
						fill='white'
						height='20px'
						width='20px'
						version='1.1'
						id='Layer_1'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 330 330'
					>
						<path
							id='XMLID_224_'
							d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
						/>
					</svg>
				</button>

				<div>{calc}</div>
			</div>
			{openhistory ? (
				<ul className={styles.history__wrapper}>
					{history.map(w => (
						<li className={styles.history}>{w}</li>
					))}
				</ul>
			) : null}
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
		</div>
	)
}
