## API
### `GET /shorten`

Shortens a URL into the `naver.me` format.

#### Query Parameters

| Name  | Type   | Required | Description                 |
| ----- | ------ | -------- | --------------------------- |
| `url` | string | Yes      | The original URL to shorten |

#### Example Request

```txt
GET /shorten?url=https://example.com
```

#### Example Response

```json
{
  "result": {
    "data": "https://naver.me/xxxxx"
  }
}
```

#### Error Response

If the `url` query parameter is missing:

```json
{
  "error": "url query is required"
}
```

If the URL could not be shortened:

```json
{
  "error": "Failed to shorten URL",
  "detail": "Error message"
}
```

## Usage

Example using `fetch`:

```js
const response = await fetch(
  'https://naverme-shortener.vercel.app/shorten?url=https://example.com'
);

const data = await response.json();
console.log(data.result.data);
```
