json.partial! "api/v1/resource", resource: @poll, competitors: @competitors
json.set! :relationships do
	json.partial! "api/v1/relationships", resource: @poll.user
end