# https://hub.docker.com/_/microsoft-dotnet-core
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY server/dotTestApiServer.csproj ./aspNetPractice/
RUN dotnet restore ./aspNetPractice/dotTestApiServer.csproj

# copy everything else and build app
COPY server/. ./aspNetPractice/
WORKDIR /source/aspNetPractice
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "dotTestApiServer.dll"]

# BUILD > docker build -t aspnetpractice .
# RUN > docker run -it --rm -p 5000:80 --name aspnetcore_test aspnetpractice