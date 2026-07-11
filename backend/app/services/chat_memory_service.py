conversation_history = []


def add_message(
    role: str,
    content: str,
) -> None:

    conversation_history.append(
        {
            "role": role,
            "content": content,
        }
    )


def get_history() -> list:
    return conversation_history


def clear_history() -> None:
    conversation_history.clear()