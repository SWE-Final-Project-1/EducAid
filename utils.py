def parse_marking_scheme(text):
    lines = text.split('\n')

    # Find the starting point of the mappings
    start_index = None
    for i, line in enumerate(lines):
        print(line)
        if line.startswith("a. ") or line.startswith("1. "):
            start_index = i
            break

    # Check if the start index was found
    if start_index is None:
        return {}

    # Parse the mappings into a dictionary
    mappings = {}
    res_arr = []
    for line in lines[start_index:]:
        if line.strip():  # Check if the line is not empty
            key, value = line.split('. ', 1)
            res_arr.append(value.strip())
            mappings[key.strip()] = value.strip()

    return mappings, res_arr

def match_solution(soln, mappings):
    start = "a"
    total = len(mappings)
    result = 0
    for val in soln:
        if mappings[start] == val:
            result += 1
        start = chr(ord(start) + 1)
    return (result * 100)/total 

if __name__ == "__main__":
    text = """Some more lines here (could be an arbitrary number)\nMore lines\nEven more lines\na. b\nb. y\nc. t\nd. u\ne. f\nf. h"""

    parsed, res_arr = parse_marking_scheme(text)
    score = match_solution(['a', 'y', 't', 'u', 'f', 'h'], parsed)
    print(parsed, res_arr, score)
