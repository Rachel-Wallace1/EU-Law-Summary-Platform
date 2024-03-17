# !pip install langchain
# !pip install pypdf
# !pip install openai

import urllib
from pathlib import Path as p

from langchain.prompts import PromptTemplate
from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import ChatOpenAI

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

content = pages[:1]

results = stuff_chain.invoke(content)

print('Summary of ')
print(results['output_text'])