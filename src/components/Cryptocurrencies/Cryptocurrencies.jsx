import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoApi';

import { Loader } from '../../components';

const Cryptocurrencies = ({ simplified = false }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredCryptos = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm));
        setCryptos(filteredCryptos);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />;

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map(currency => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card title={`${currency.rank}. ${currency.name}`} extra={<img src={currency.iconUrl} alt={currency.name} className="crypto-image" />} hoverable>
                                <p>Price: {`$${millify(currency.price)}`}</p>
                                <p>Market Cap: {`$${millify(currency.marketCap)}`}</p>
                                <p>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies;
