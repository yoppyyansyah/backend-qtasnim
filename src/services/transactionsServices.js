'use strict';
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../config/db');
const Transactions = require('../models/transactions');
const { v4: uuidv4 } = require('uuid');

const create = async (data) => {
    try {


        data.id = uuidv4()
        const dataTransaction = await Transactions.findOne({
            where: {
                itemsId: data.itemsId
            },
            order: [
              ['createdAt', 'desc']
            ]
        });


        let currentStock = 0
        if(dataTransaction) {
            if(data.type === 'in') {
                currentStock = dataTransaction.stock + data.qty
            }else{
                currentStock = dataTransaction.stock - data.qty
            }
        }else {
            currentStock = data.qty
        }
        data.stock = currentStock
        data.createdBy = 'Admin'
        data.updatedBy = 'Admin'

        const newTransaction = await Transactions.create({...data});
        return newTransaction;
    } catch (error) {
        console.log(error);
        throw new Error('Gagal membuat transaksi');
    }
}

const getAll = async (searchQuery) => {
    try {
        let whereClause = 'WHERE t.active = :active';
        const replacements = { active: 'ACTIVE' };

        if (searchQuery) {
            whereClause += ' AND (i.name LIKE :searchQuery OR DATE_FORMAT(t.transactionDate, "%d-%m-%Y") LIKE :searchQuery)';
            replacements.searchQuery = `%${searchQuery}%`;
        }

        const query = `
            select 
                i.name as "itemsName", 
                t.stock,
                CASE 
                    when t.type = 'out' then t.qty
                    else null
                END as "qty",
                DATE_FORMAT(t.transactionDate, '%d-%m-%Y') AS "transactionDate",
                c.name as "categoriesName"
            from Transactions t 
            left join Items i on i.id = t.itemsId 
            left join Categories c on c.id = i.categoriesId 
            ${whereClause}
            order by t.createdAt asc
        `;

        console.log("query",query)

        const transactions = await sequelize.query(query, {
            replacements,
            type: QueryTypes.SELECT,
            model: Transactions, 
            mapToModel: true 
        });
        return transactions;
    } catch (error) {
        console.log(error);
        throw new Error('Gagal mendapatkan transaksi');
    }
}

const compareData = async (params) => {
    try {
        const query = `
            select 
                c.name as "categoriesName",
                max(t.qty) as "maxQty",
                min(t.qty) as "minQty"
            from Transactions t 
            left join Items i on i.id = t.itemsId 
            left join Categories c on c.id = i.categoriesId 
            WHERE t.active = 'ACTIVE'
            and t.type = 'out'
            and c.id in (:categoriesOne,:categoriesTwo)
            AND t.transactiondate >= :startDate
            AND t.transactiondate <= :endDate
            group by c.name
        `;

        console.log("query",query)

        const transactions = await sequelize.query(query, {
            replacements : {
                categoriesOne: `${params.categoriesOne}`,
                categoriesTwo: `${params.categoriesTwo}`,
                startDate: `${params.startDate}`,
                endDate: `${params.endDate}`,

            },
            type: QueryTypes.SELECT,
            model: Transactions, 
            mapToModel: true 
        });
        return transactions;
    } catch (error) {
        console.log(error);
        throw new Error('Gagal mendapatkan transaksi');
    }
}

module.exports = {
    create,
    getAll,
    compareData
};
