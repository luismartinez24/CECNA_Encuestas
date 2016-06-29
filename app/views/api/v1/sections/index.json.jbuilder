json.array! @sections do |section|
    json.partial! "api/v1/resource", resource: section
end