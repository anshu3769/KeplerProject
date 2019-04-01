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

    words = [''.join(
        [alphabets[random.randint(0,25)]
         for _ in range(7)]
    )
             for _ in range(200)]

    return(words)


#words = generateWords()
#print(words)
