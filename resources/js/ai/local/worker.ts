import { pipeline, PipelineType, TextStreamer } from '@huggingface/transformers';

class ChatPipeline {
	static task: PipelineType = 'text-generation';
	static model = 'onnx-community/Qwen2.5-0.5B-Instruct'
	static instance: any = null;

	static async getInstance(progressCallback: any = null) {

		this.instance ??= pipeline(this.task, this.model, { progress_callback: progressCallback });

		self.addEventListener('message', async (e) => {

			const message = await ChatPipeline.getInstance((v: any) => {
				self.postMessage(v)
			});

			const streamer = new TextStreamer(message.tokenizer, {
				skip_prompt: true,
				skip_special_tokens: true,
				callback_function: (text) => {
					self.postMessage({
						status: 'update',
						output: text
					})
				}
			})

			const output = await message(e.data.text, {
				streamer,
				text: e.data.text,
			})

			self.postMessage({
				status: 'done',
				output
			})
		});

		return this.instance;
	}
}
