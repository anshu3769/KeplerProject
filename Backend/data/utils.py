import random
import string

#generates a list of lowercase alphabets
alphabets =  list(string.ascii_lowercase)

def generateWords():

    """
    Generate a list of words
    by randomly choosing characters
    from the alphabet set
    input : None
    output: List of words

    """

    #words:List[String] = []
    #word:String = ""

    #generate 100 words of length 8 characters and store them to a list
    # for i in range(100):
    #     for j in range(7):
    #         k:Integer = random.randint(0,25)
    #         word+=alphabets[k]
    #     words.append(word)
    #     word = ""

    # words = [''.join(alphabets[random.randint(0,25)])
    #          for i in range(100)
    #          for j in range(7)
    #          ]

    words = [''.join([alphabets[random.randint(0,25)] for i in range(7)]) for j in range(100)]
    return(words)


#words = generateWords()
#print(words)
