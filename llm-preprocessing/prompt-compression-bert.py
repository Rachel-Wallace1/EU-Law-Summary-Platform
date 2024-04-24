from llmlingua import PromptCompressor
from transformers import GPT2Tokenizer

## Or use LLMLingua-2-small model
llm_lingua = PromptCompressor(
    model_name="microsoft/llmlingua-2-bert-base-multilingual-cased-meetingbank",
    use_llmlingua2=True, # Whether to use llmlingua-2
    device_map="cpu"
)

# Example 1
prompt_example1 = "John: So, um, I've been thinking about the project, you know, and I believe we need to, uh, make some changes. I mean, we want the project to succeed, right? So, like, I think we should consider maybe revising the timeline.\nSarah: I totally agree, John. I mean, we have to be realistic, you know. The timeline is, like, too tight. You know what I mean? We should definitely extend it."
compressed_prompt1 = llm_lingua.compress_prompt(prompt_example1, rate=0.33, force_tokens = ['\n', '?'])
print(compressed_prompt1)
# 'origin_tokens': 98, 'compressed_tokens': 30, 'ratio': '3.3x', 'rate': '30.6%', 'saving': ', Saving $0.0 in GPT-4.'}

