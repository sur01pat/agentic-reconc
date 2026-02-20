# import boto3
# import os

# client = boto3.client(
#     "bedrock-runtime",
#     region_name=os.getenv("AWS_REGION", "us-east-1")
# )

# MODEL_ID = os.getenv("LLM_MODEL_ID", "nvidia.nemotron-nano-12b-v2")
# # MODEL_ID = os.getenv("LLM_MODEL_ID", "amazon.nova-lite-v2")


# def call_llm(prompt: str) -> str:

#     response = client.converse(
#         modelId=MODEL_ID,
#         messages=[
#             {
#                 "role": "user",
#                 "content": [
#                     {"text": prompt}
#                 ]
#             }
#         ],
#         inferenceConfig={
#             "maxTokens": 400,
#             "temperature": 0.1
#         }
#     )

#     return response["output"]["message"]["content"][0]["text"]



# import boto3
# import os

# # -------------------------------------------------
# # Create Bedrock Runtime Client
# # -------------------------------------------------
# client = boto3.client(
#     "bedrock-runtime",
#     region_name=os.getenv("AWS_REGION", "us-east-1")
# )

# # -------------------------------------------------
# # LLM Call Wrapper
# # -------------------------------------------------
# def call_llm(prompt: str) -> str:
#     """
#     Calls Amazon Bedrock Converse API using
#     model defined in environment variable LLM_MODEL_ID.
#     Defaults to Nova 2 Lite if not provided.
#     """

#     # ✅ READ MODEL AT RUNTIME (important)
#     model_id = os.getenv("LLM_MODEL_ID", "amazon.nova-2-lite-v1:0")

#     print("🚀 Bedrock invoke model:", model_id)

#     response = client.converse(
#         modelId=model_id,
#         messages=[
#             {
#                 "role": "user",
#                 "content": [
#                     {"text": prompt}
#                 ]
#             }
#         ],
#         inferenceConfig={
#             "maxTokens": 400,
#             "temperature": 0.1
#         }
#     )

#     return response["output"]["message"]["content"][0]["text"]


import boto3
import os

client = boto3.client(
    "bedrock-runtime",
    region_name=os.getenv("AWS_REGION", "us-east-1")
)

# -----------------------------------------
# Dynamic model invocation
# -----------------------------------------
def call_llm(prompt: str, model_id: str) -> str:

    print(f"🚀 Bedrock invoke model: {model_id}")

    response = client.converse(
        modelId=model_id,
        messages=[
            {
                "role": "user",
                "content": [{"text": prompt}]
            }
        ],
        inferenceConfig={
            "maxTokens": 400,
            "temperature": 0.1
        }
    )

    return response["output"]["message"]["content"][0]["text"]
