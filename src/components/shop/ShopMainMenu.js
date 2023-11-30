import React from 'react';

function ShopMainMenu() {
    return (
        <div>
            <div class="shop-form-container">
                <table style={{ borderCollapse: 'collapse', width: '100%', height: '300px', border: '1px solid black' }}>
                    <tbody>
                        <tr>
                            <td>체중</td>
                            <td>전체</td>
                            <td>가위</td>
                            <td>목욕</td>
                        </tr>
                        <tr>
                            <td>~5 Kg</td>
                            <td>~7 Kg</td>
                            <td>~10 Kg</td>
                            <td>10 Kg ~</td>
                        </tr>
                        <tr>
                            <td>50,000 원</td>
                            <td>50,000 원</td>
                            <td>50,000 원</td>
                            <td>50,000 원</td>
                        </tr>
                        <tr>
                            <td>50,000 원</td>
                            <td>50,000 원</td>
                            <td>50,000 원</td>
                            <td>50,000 원</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShopMainMenu;