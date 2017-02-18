Param(
	[string] $key,
	[string] $secret
)

web-ext sign --api-key="$key" --api-secret="$secret" -s="./extension"
