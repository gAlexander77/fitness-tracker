#!/usr/bin/env python3

import argparse
import requests
import json
import os


COOKIE_PATH = "./.cookie"


def parse_params(data: str) -> dict:
    params = {}
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
    parser.add_argument("-p", "--post", action="store_true")
    parser.add_argument("-d", "--data", type=str)
    parser.add_argument("-j", "--json", type=str)
    parser.add_argument("-v", "--verbose", action="store_true")

    args = parser.parse_args()

    session = load_session(COOKIE_PATH)

    if args.data or args.post:
        response = session.post(args.url, data=args.data)
    elif args.json:
        response = session.post(args.url, json=parse_params(args.json))
    else:
        response = session.get(args.url)

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
