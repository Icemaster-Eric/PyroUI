from sanic import Sanic, response
from sanic.request import Request


app = Sanic("PyroUI")

app.static("/", ".")


@app.post("/submit")
def submit(request: Request):
    print(request.form)
    return response.json(request.form)


if __name__ == "__main__":
    app.run(
        "0.0.0.0",
        8080,
        auto_reload=True
    )
