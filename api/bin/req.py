#!/usr/bin/env python3

import tempfile
import argparse
import requests
import json
import os

COOKIE_PATH = os.path.join(tempfile.gettempdir(), ".cookie")

def parse_params(data: str) -> dict:
    params = {}
    if data is None:
        return params

    for token in data.split(','):
        pair = token.split(':')
        if len(pair) != 2:
            print("invalid format")
            raise Exception
        params[pair[0].strip()] = pair[1].strip()
    return params


def load_session(path: str) -> requests.session:
    session = requests.session()
    if os.path.isfile(path):
        with open(path, "rt") as stream:
            session.headers["cookie"] = stream.read().strip()
    return session


def print_headers(headers):
    for k, v in headers.items():
        print(k, v, sep=": ")


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("url", type=str)
    parser.add_argument("-p", "--post", 
        help="make it a POST request", action="store_true")
    parser.add_argument("-x", "--delete", 
        help="make it a DELETE request", action="store_true")
    parser.add_argument("-d", "--data", 
        help="GET/POST data in the form: 'key1: val1, key2: val2'", type=str)
    parser.add_argument("-j", "--json", 
        help="POST JSON data in the form: 'key1: val1, key2: val2'", type=str)
    parser.add_argument("-v", "--verbose", action="store_true")

    args = parser.parse_args()
    session = load_session(COOKIE_PATH)

    if args.post:
        response = session.post(args.url, data=parse_params(args.data))
    elif args.json:
        response = session.post(args.url, json=json.loads(args.json))
    elif args.delete:
        response = session.delete(args.url)
    else:
        response = session.get(args.url, params=parse_params(args.data))

    if args.verbose:
        print_headers(response.headers)

    content_type = response.headers.get("content-type")
    if content_type and content_type.startswith("application/json"):
        print(json.dumps(response.json()))
    else:
        print(response.text)

    cookie = response.headers.get("set-cookie")
    if cookie:
        with open(COOKIE_PATH, "wt+") as stream:
            print(cookie, file=stream)
