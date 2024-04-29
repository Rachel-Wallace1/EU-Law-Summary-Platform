

def prompt_styling():
    prompt_struc = """
    Here is the template for the summary structure should follow, make a very long summary:

    SUMMARY OF:
    - [titles of the original resource(s) in bullet form and hyperlinked]

    WHAT IS THE AIM OF ......?
    <content here>

    KEY POINTS
    <content here>

    FROM WHEN DOES THE DECISION APPLY?
    <content here>

    BACKGROUND
    <content here>

    KEY TERMS
    - **<bullet list of terms, bolding the term>**

    MAIN DOCUMENT
    - [the title(s) of the main document(s), in bullet form and hyperlinked]

    RELATED DOCUMENTS
    <titles of related documents if any>
    """
    return prompt_struc