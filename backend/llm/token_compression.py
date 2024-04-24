from llmlingua import PromptCompressor
from transformers import BertModel,BertTokenizer
import logging

def llmlingua_style_compress(prompt):
    logging.getLogger("pytorch_pretrained_bert.tokenization").setLevel(logging.ERROR)
    llm_lingua = PromptCompressor(
        model_name="microsoft/llmlingua-2-bert-base-multilingual-cased-meetingbank",
        use_llmlingua2=True, # Whether to use llmlingua-2
        device_map="cpu"
    )
    model_class, tokenizer_class, pretrained_weights = BertModel, BertTokenizer, 'bert-base-uncased'
    tokenizer = tokenizer_class.from_pretrained(pretrained_weights)
    model = model_class.from_pretrained(pretrained_weights)

    prompt_example2 = tokenizer(prompt, truncation=True, max_length=400)

    input_ids = prompt_example2['input_ids']

    truncated_input_ids = input_ids[:512]

    truncated_prompt = tokenizer.decode(truncated_input_ids)


    compressed_prompt = llm_lingua.compress_prompt(truncated_prompt, rate=0.33, force_tokens = ['\n', '?'])
    # print(compressed_prompt)
    return compressed_prompt['compressed_prompt']
