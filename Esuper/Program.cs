using Esuper.Data.Model;
using Esuper.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000");
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "Esuper Transaction Assessment", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();

//Setup Swagger Documentation
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "Esuper Transcation Assessment";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Assessment 2 for technical interview");
    swaggerUIOptions.RoutePrefix = string.Empty;
});


app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

//API CALLS FOR RAW TRANSACTIONS


//API call to return all raw transactions
app.MapGet("/get-all-rawtransactions", async () => await RawBankTransactionsRepository.GetTransactionsAsync())
    .WithTags("Raw Transactions Endpoints");

//API call to get raw transactions by ID
app.MapGet("/get-rawtransaction-by-id/{transactionID}", async (int transactionID) =>
{
    Transaction transactionToReturn = await RawBankTransactionsRepository.GetTransactionByIdAsync(transactionID);

    if (transactionToReturn != null)
    {
        return Results.Ok(transactionToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Raw Transactions Endpoints");

//API call to get all raw transactions for a specified account
app.MapGet("/get-rawtransaction-by-accountNumber/{accountNumber}", async (int accountNumber) =>
{
    List<Transaction> transactionList = await RawBankTransactionsRepository.GetTransactionByAccountNumberAsync(accountNumber);

    if (transactionList != null)
    {
        return Results.Ok(transactionList);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Raw Transactions Endpoints");


//API call to create new raw transactions
app.MapPost("/create-rawtransaction", async (Transaction transactionToCreate) =>
{
    bool createSuccessful = await RawBankTransactionsRepository.CreateTransactionAsync(transactionToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Create Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Raw Transactions Endpoints");

//API call to update raw transactions
app.MapPut("/update-rawtransaction", async (Transaction transactionToUpdate) =>
{
    bool updateSuccessful = await RawBankTransactionsRepository.UpdateTransactionAsync(transactionToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Raw Transactions Endpoints");

//API call to delete raw transactions
app.MapDelete("/delete-rawtransaction-by-id", async (int transactionID) =>
{
    bool deleteSuccessful = await RawBankTransactionsRepository.DeleteTransactionAsync(transactionID);

    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Raw Transactions Endpoints");



//API CALLS FOR BANK TRANSACTIONS

//API call to return all bank transactions
app.MapGet("/get-all-banktransactions", async () => await BankTransactionRepository.GetTransactionsAsync())
    .WithTags("Bank Transactions Endpoints");

//API call to get bank transactions by ID
app.MapGet("/get-banktransaction-by-id/{transactionID}", async (int transactionID) =>
{
    Transaction transactionToReturn = await BankTransactionRepository.GetTransactionByIdAsync(transactionID);

    if (transactionToReturn != null)
    {
        return Results.Ok(transactionToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Bank Transactions Endpoints");

//API call to get all bank transactions for a specified account
app.MapGet("/get-banktransaction-by-accountNumber/{accountNumber}", async (int accountNumber) =>
{
    List<Transaction> transactionList = await BankTransactionRepository.GetTransactionByAccountNumberAsync(accountNumber);

    if (transactionList != null)
    {
        return Results.Ok(transactionList);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Bank Transactions Endpoints");

//API call to get final account balance
app.MapGet("/get-bank-account-balance/{accountNumber}", async (int accountNumber) =>
{
    Transaction accountBalanceTransaction = await BankTransactionRepository.GetBalanceByAccountNumberAsync(accountNumber);


    if (accountBalanceTransaction != null)
    {
        return Results.Ok(accountBalanceTransaction);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Bank Transactions Endpoints");

//API call to create new bank transactions
app.MapPost("/create-banktransaction", async (Transaction transactionToCreate) =>
{
    bool createSuccessful = await BankTransactionRepository.CreateTransactionAsync(transactionToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Create Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Bank Transactions Endpoints");

//API call to update bank transactions
app.MapPut("/update-banktransaction", async (Transaction transactionToUpdate) =>
{
    bool updateSuccessful = await BankTransactionRepository.UpdateTransactionAsync(transactionToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Bank Transactions Endpoints");

//API call to delete bank transactions
app.MapDelete("/delete-banktransaction-by-id", async (int transactionID) =>
{
    bool deleteSuccessful = await BankTransactionRepository.DeleteTransactionAsync(transactionID);

    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Bank Transactions Endpoints");




app.Run();
