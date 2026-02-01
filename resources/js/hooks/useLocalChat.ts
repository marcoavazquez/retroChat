import React, { useEffect, useRef } from 'react'

type Status = 'initiate' | 'progress' | 'done' | 'ready' | 'update' | 'complete'

const useLocalChat = (model: string) => {

	const worker = useRef<Worker | null>(null)
	const [status, setStatus] = React.useState<Status>('initiate')
	const [output, setOutput] = React.useState('')
	const [progress, setProgress] = React.useState([])

	useEffect(() => {

		worker.current ??= new Worker(new URL('../ai/local/worker.ts', import.meta.url), {
			type: 'module'
		})

		const onMessageReceived = (e) => {
			setStatus(e.data.status)
			switch (e.data.status) {
				case 'initiate':
					setProgress(prev => [...prev, e.data])
					break;
				case 'progress':
					setProgress(
						prev => prev.map(item => {
							if (item.file === e.data.file) {
								return {
									...item,
									progress: e.data.progress
								}
							}
							return item
						})
					)
					break;
				case 'done':
					setProgress(prev => prev.filter(item => item.file !== e.data.file))
					break;
				case 'update':
					setOutput(prev => prev + e.data.output)
					break;
			}
		}

		worker.current.addEventListener('message', onMessageReceived)

		return () => {
			worker.current?.removeEventListener('message', onMessageReceived)
		}

	}, [])

	return {
		worker,
		status,
		output,
		progress,
	}

}

export default useLocalChat;
