# !pip install langchain
# !pip install pypdf
# !pip install openai

import urllib
from pathlib import Path as p

from langchain.prompts import PromptTemplate
from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import ChatOpenAI
import pandas as pd

import os

os.environ["OPENAI_API_KEY"] = "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"

llm = ChatOpenAI(model_name = 'gpt-3.5-turbo-16k')

data_folder = p.cwd() / "data"
p(data_folder).mkdir(parents=True, exist_ok=True)

pdf_url = "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32014R1144"
pdf_file = str(p(data_folder, pdf_url.split("/")[-1]))

print('Law Document:', pdf_url)

urllib.request.urlretrieve(pdf_url, pdf_file)

pdf_loader = PyPDFLoader(pdf_file)
pages = pdf_loader.load_and_split()
# print(pages[3].page_content)

prompt_template = """Write a concise summary of the following text delimited by triple backquotes.
              Return your response in bullet points which covers the key points of the text.
              ```{text}```
              BULLET POINT SUMMARY:
  """

prompt = PromptTemplate(template=prompt_template, input_variables=["text"])

stuff_chain = load_summarize_chain(llm, chain_type="stuff", prompt=prompt)


print('===================')
print('Number of Tokens per Page')
total = 0
for i, page in enumerate(pages):
  total += len(page.page_content.split())
  print(f'Page {i:2d} - Length {len(page.page_content.split())}')
print(total)
print('===================')

# print(pages[0].page_content)

print('########### Single Shot Summarization ##########')

content = pages[:3]

results = stuff_chain.invoke(content)

print('Summary of ')
print(results['output_text'])


print('########### Map Reduce Summarization ##########')
map_prompt_template = """
                      Write a summary of this chunk of text that includes the main points and any important details.
                      {text}
                      """

map_prompt = PromptTemplate(template=map_prompt_template, input_variables=["text"])

combine_prompt_template = """
                      Write a concise summary of the following text delimited by triple backquotes.
                      Return your response in bullet points which covers the key points of the text.
                      ```{text}```
                      BULLET POINT SUMMARY:
                      """

combine_prompt = PromptTemplate(
    template=combine_prompt_template, input_variables=["text"]
)

map_reduce_chain = load_summarize_chain(
    llm,
    chain_type="map_reduce",
    map_prompt=map_prompt,
    combine_prompt=combine_prompt,
    return_intermediate_steps=True,
)

map_reduce_outputs = map_reduce_chain.invoke({"input_documents": pages[:3]})

final_mp_data = []
for doc, out in zip( map_reduce_outputs["input_documents"], map_reduce_outputs["intermediate_steps"]):
    output = {}
    output["file_name"] = p(doc.metadata["source"]).stem
    output["file_type"] = p(doc.metadata["source"]).suffix
    output["page_number"] = doc.metadata["page"]
    output["chunks"] = doc.page_content
    output["concise_summary"] = out
    final_mp_data.append(output)

pdf_mp_summary = pd.DataFrame.from_dict(final_mp_data)
pdf_mp_summary = pdf_mp_summary.sort_values(
    by=["file_name", "page_number"]
)  # sorting the dataframe by filename and page_number
pdf_mp_summary.reset_index(inplace=True, drop=True)
pdf_mp_summary.head()

index = 2
print("[Context]")
print(pdf_mp_summary["chunks"].iloc[index])
print("\n\n [Simple Summary]")
print(pdf_mp_summary["concise_summary"].iloc[index])
print("\n\n [Page number]")
print(pdf_mp_summary["page_number"].iloc[index])
print("\n\n [Source: file_name]")
print(pdf_mp_summary["file_name"].iloc[index])