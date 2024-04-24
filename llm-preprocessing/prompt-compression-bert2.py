from llmlingua import PromptCompressor
from transformers import BertModel,BertTokenizer

llm_lingua = PromptCompressor(
    model_name="microsoft/llmlingua-2-bert-base-multilingual-cased-meetingbank",
    use_llmlingua2=True, # Whether to use llmlingua-2
    device_map="cpu"
)


# Example 2
prompt_example2 = "Madam Court, could you please read docket 1239? Certainly. Docket 1239. The Committee on Government Operations, to which was referred on December 1st, 2021, docket number 1239 message an order authorizing the creation of a sheltered market program in conformity with the requirements of general laws. Chapter 30 B Section 18. This authorization applies to contracts for goods, professional services and support services. This authorization is for no more than six contracts, which must be awarded by June 30th, 2022. This sheltered market program shall be available for disadvantaged, minority and women only vendors, for whom there is a demonstrated substantial disparity in the city's 2020 disparities. Study submits a report recommending the order ought to pass. Thank you so much, Madam Clerk. The Chair recognizes Councilor Edwards, chair of the committee. Councilor Edwards. You have the floor. This is this is actually a matter, I believe, sponsored by the. Mayor in Cannes. In conformance with the recommendations from the disparity study and making sure that we opt in to this this pilot program under mass general laws 30 Section 18. Again, it's really just following the recommendations of an already studied issue, which which demonstrates a disparity between minority contractors or women contractors receiving contracts in the city of Boston. So this would allow for us to shepherd and move these six contracts to those already designated groups who have a disadvantage. And I think it's. Really fulfilling a promise. Of making sure that we go through and make sure all aspects of the city government, including the financial benefits, are accessible to people in the city of Boston. I recommend that this pass and I hope that my colleagues will vote for it. Thank you. Thank you so much. Councilor Edward seeks acceptance of the committee report and passage of Docket 1239. Madam Court, could you please call the roll? Certainly. Docket 1239. Councilor Arroyo. Yes. Councilor Arroyo. Yes. Councilor Baker. Councilor Baker. Councilor. Councilor Barker. Council Braden. Councilor Braden. Councilor Campbell. Councilor Campbell. Yes. Councilor Edwards. Yes. Councilor Sabby. George. Councilor Sabby. George. He has Councilor Flaherty. Councilor Flaherty as Councilor Flynn. Councilor Flynn. Yes. Councilor Jane. Yes. Councilor Janey. As Councilor me here. Councilor me here as Councilor Murphy. Councilor Murphy. Yes. And Councilor O'Malley. Yes. Councilor O'Malley. Yes. Madam President, do I get number 1239 has received unanimous vote. Thank you so much. Dockett 1239 has passed and now we will move on to matters recently heard for possible action. Madam Clerk, if you could please read docket 0863. Certainly Docket 0863 order for hearing to discuss pest control and illegal dumping in the city of Boston."


model_class, tokenizer_class, pretrained_weights = BertModel, BertTokenizer, 'bert-base-uncased'
tokenizer = tokenizer_class.from_pretrained(pretrained_weights)
model = model_class.from_pretrained(pretrained_weights)

# prompt_example2 = tokenizer(prompt_example2, truncation=True, max_length=500)
# Tokenize the prompt_example2 text
prompt_example2 = tokenizer(prompt_example2, truncation=True, max_length=400)
print(prompt_example2)

# # Get the input_ids of the tokenized text
input_ids = prompt_example2['input_ids']
print(input_ids)

# Truncate the input_ids if it exceeds the maximum length
truncated_input_ids = input_ids[:512]
print(truncated_input_ids)

# Convert the truncated input_ids back to text
truncated_prompt = tokenizer.decode(truncated_input_ids)
print(truncated_prompt)


compressed_prompt2 = llm_lingua.compress_prompt(truncated_prompt, rate=0.33, force_tokens = ['\n', '?'])
print(compressed_prompt2)
# 'origin_tokens': 626, 'compressed_tokens': 201, 'ratio': '3.1x', 'rate': '32.1%', 'saving': ', Saving $0.0 in GPT-4.'}

