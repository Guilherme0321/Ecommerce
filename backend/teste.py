import requests

# URL para a qual você quer fazer a requisição
url = "http://localhost:5000/product/update/23"
#url = "http://localhost:5000/user/insert?name=John Doe&address=Flower Street,123,Happy City&email=john.doe@email.com&phone=(11) 98765-4321&username=johndoe123&password=Password@123"
#url = 'http://localhost:5000/user/update/10?name=John Doe&address=Flower Street,123,Happy City&email=john.doe@email.com&phone=(11) 98765-4321&username=johndoe123&password=password@123'
# Fazendo a requisição GET
product_data = {
    "name": "Smartphone XYZ",
    "stock": 50,
    "description": """Introducing the Smartphone XYZ, a cutting-edge device that redefines the smartphone experience. With its powerful hardware and sleek design, this smartphone is crafted to meet the demands of modern users. Explore advanced features such as a high-resolution display, dual-camera system, and lightning-fast processor.

Stay connected with the latest technology trends and capture stunning moments with the state-of-the-art camera setup. The Smartphone XYZ offers a seamless user interface, providing a smooth and responsive experience for everyday tasks and entertainment.

Equipped with a robust stock of 100 units, this smartphone is ready to meet your needs. Whether you are a tech enthusiast, professional, or casual user, the Smartphone XYZ promises to elevate your mobile experience. Order yours now and join the next generation of mobile technology.""",
    "images": ["image_url1.jpg", "image_url2.jpg"],
    "price": 699.99,
    "categories": ["Electronics", "Mobile Phones"]
}
response = requests.put(url, params=product_data)


# Verificando se a requisição foi bem-sucedida (código de status 200)
if response.status_code == 200:
    # Conteúdo da resposta
    print(response.text)
else:
    print(f"Erro: {response.status_code}")