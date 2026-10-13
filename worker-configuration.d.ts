interface NullshotSelectableModel {
	id: string;
	name: string;
	modality: string;
	provider?: string;
	capabilities?: string[];
	pricing?: unknown;
	invocation?: unknown;
}

/** Nullshot API proxy / model router binding (`env.NULLSHOT_API`). */
interface NullshotApiBinding extends Fetcher {
	/** LLM chat completion by catalog model id (Grok, OpenAI, Anthropic, Workers AI). */
	chat(options: {
		model: string;
		messages: Array<{ role: string; content: unknown }>;
		maxTokens?: number;
		temperature?: number;
		extra?: Record<string, unknown>;
	}): Promise<{ text: string; usage?: { inputTokens?: number; outputTokens?: number }; raw: unknown }>;
	/** One-shot image generation (Runware). Returns the generated image URL. */
	image(options: {
		model: string;
		prompt: string;
		width?: number;
		height?: number;
		numberResults?: number;
		extra?: Record<string, unknown>;
	}): Promise<{ url: string; raw: unknown }>;
	/** Submit an async video generation (Runware). Poll with getMedia(). */
	video(options: {
		model: string;
		prompt: string;
		duration?: number;
		resolution?: string;
		extra?: Record<string, unknown>;
	}): Promise<{ taskId: string; raw: unknown }>;
	/** Poll an async media task (video) by its Runware task id. */
	getMedia(taskId: string): Promise<{ status: string; url?: string; raw: unknown }>;
	/** Models an end-user picker may offer (text/image/video), each routable. */
	models(filter?: { modality?: string; query?: string }): NullshotSelectableModel[];
}

interface CloudflareEnv {
	ASSETS: Fetcher;
	AI: Ai;
	NULLSHOT_API: NullshotApiBinding;
}
