def generate_ai_response(
    prompt: str,
) -> str:
    if not prompt.strip():
        return (
            "Unable to generate a response because no prompt was provided."
        )

    return (
        "LLM integration is not enabled yet."
    )