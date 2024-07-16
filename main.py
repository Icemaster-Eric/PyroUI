from sanic import Sanic, response
from sanic.request import Request


html = {}

with open("public/index.html", "r") as f:
    html["index"] = f.read()


app = Sanic("PandaNexus")

app.static("/public", "./public/")


@app.route("/")
def root(request: Request):
    return response.html(html["index"])


@app.post("/submit")
def submit(request: Request):
    return response.json(request.form)


if __name__ == "__main__":
    app.run(
        "0.0.0.0",
        8080,
        auto_reload=True
    )
