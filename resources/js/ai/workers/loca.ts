import { pipeline, env, PipelineType, Text2TextGenerationPipeline } from '@huggingface/transformers'

env.allowLocalModels = false;
// env.useBrowserCache = true;

let generator: any = null;
let isInitialized = false;

const initialize = async (model: string) => {
	try {
		self.postMessage({
			type: 'status',
			message: 'Loading...'
		})

		generator = await pipeline(
			'text2text-generation',
			model,
			{
				progress_callback: (progress: any) => {
					if (progress.status === 'progress') {
						const percent = Math.round((progress.loaded / progress.total) * 100)
						self.postMessage({
							type: 'progress',
							percent
						})
					}
				}
			}
		)

		isInitialized = true
		self.postMessage({
			type: 'ready',
			message: 'Ready to chat'
		})
	} catch (error: any) {
		console.log('Error initializing model', error)
		self.postMessage({
			type: 'error',
			message: 'Error initializing model: ' + error?.message
		})
	}
}

const generateResponse = async (message: string) => {
	if (!isInitialized) {
		self.postMessage({
			type: 'error',
			message: 'Model not initialized'
		})
		console.log('Model not initialized')
		return;
	}

	try {
		const result = await generator(message, {
			max_new_tokens: 100,
			temperature: 0.7,
			do_sample: true,
		})

		const response = result[0].generated_text
		console.log('response', response)
		self.postMessage({
			type: 'response',
			message: response
		})
	} catch (error: any) {
		console.log('Error generating response', error)
		self.postMessage({
			type: 'error',
			message: 'Error generating response: ' + error?.message
		})
	}
}

self.addEventListener('message', async (e) => {
	const { type, message } = e.data
	console.log('type', type)
	switch (type) {
		case 'init':
			initialize(message)
			break;
		case 'generate':
			generateResponse(message)
			break;
	}
})
