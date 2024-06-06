import os
import time
from hugchat import hugchat
from hugchat.login import Login
import argparse
max_prompt_length = 50

def generate_branding_snippet(prompt: str):
    start_time = time.time()
    EMAIL = os.getenv("EMAIL")
    PASSWORD = os.getenv("PASSWORD")

    if not EMAIL or not PASSWORD:
        raise ValueError("EMAIL and PASSWORD environment variables must be set")

    cookie_path_dir = "/tmp/cookies/"  # Use /tmp directory
    os.makedirs(cookie_path_dir, exist_ok=True)  # Ensure the directory exists

    sign = Login(EMAIL, PASSWORD)
    cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)
    
    # Debugging logs
    print(f"Time after login: {time.time() - start_time} seconds")
    
    enriched_prompt = f"Generate upbeat branding snippet for {prompt}"

    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
    chatbot.new_conversation(switch_to=True, modelIndex=0)
    
    # Debugging logs
    print(f"Time before chat: {time.time() - start_time} seconds")
    
    query_result = chatbot.chat(enriched_prompt, web_search=False)
    
    # Debugging logs
    print(f"Total time: {time.time() - start_time} seconds")
    
    return query_result

def generate_branding_keyword(prompt: str):
    start_time = time.time()
    EMAIL = os.getenv("EMAIL")
    PASSWORD = os.getenv("PASSWORD")

    if not EMAIL or not PASSWORD:
        raise ValueError("EMAIL and PASSWORD environment variables must be set")

    cookie_path_dir = "/tmp/cookies/"  # Use /tmp directory
    os.makedirs(cookie_path_dir, exist_ok=True)  # Ensure the directory exists

    sign = Login(EMAIL, PASSWORD)
    cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)
    
    # Debugging logs
    print(f"Time after login: {time.time() - start_time} seconds")
    
    enriched_prompt = f"Generate related branding keyword for {prompt}"

    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
    chatbot.new_conversation(switch_to=True, modelIndex=0)
    
    # Debugging logs
    print(f"Time before chat: {time.time() - start_time} seconds")
    
    query_result = chatbot.chat(enriched_prompt, web_search=False)
    
    # Debugging logs
    print(f"Total time: {time.time() - start_time} seconds")
    
    return query_result

def validate_length(prompt: str) -> bool:
    return len(prompt) <= max_prompt_length


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input","-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    if validate_length(user_input):
        print(f"user input: {user_input}")
        generate_branding_snippet(user_input)
        time.sleep(2)
        generate_branding_keyword(user_input)

    else:
        raise ValueError(f"Input user is too long. must be under {max_prompt_length} ")

if __name__ =="__main__":
    main()

