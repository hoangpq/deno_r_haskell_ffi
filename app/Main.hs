{-# OPTIONS_GHC -fplugin-opt=Foreign.Storable.Generic.Plugin:-v1 #-}
{-# LANGUAGE ForeignFunctionInterface #-}

module Main where

import           Control.Applicative
import           Foreign
import           Foreign.C
import           Prelude hiding (lex)
import           Text.ParserCombinators.ReadP
import           Text.Read.Lex
import           GHC.Ptr

import           Data.List (elemIndex)
import           Control.Monad
import           Control.Concurrent
import           Control.Concurrent.STM
import           Foreign.Marshal.Alloc
import           Foreign.Marshal.Array (mallocArray)
import           Data.Maybe (fromMaybe)
import           Foreign.Storable (Storable)

import           Control.Concurrent
import           Control.Concurrent.STM

foreign export ccall "eval" c_eval :: CString -> Ptr CInt -> FunPtr (CInt -> IO ()) -> IO (Ptr CInt)
foreign export ccall "goroutine" goroutine :: FunPtr (CInt -> IO ()) -> IO CInt
foreign export ccall "timer" timer :: FunPtr (CInt -> IO ()) -> Int -> IO ()
foreign import ccall "dynamic" mkFun :: FunPtr (CInt -> IO ()) -> (CInt -> IO ())
foreign import ccall "sin" c_sin :: Double -> IO Double
foreign export ccall "array" array :: IO (Ptr CInt)

mkArray :: [Int] -> IO (Ptr CInt)
mkArray vals = do
    ptr <- mallocArray $ ((+1) . length) vals
    _ <- pokeElemOff ptr 0 $ (intToCInt . length) vals
    forM_ vals $ \v -> do
        let idx = fromMaybe 0 $ v `elemIndex` vals
        pokeElemOff ptr (idx + 1) (intToCInt v)
    return ptr

array :: IO (Ptr CInt)
array = mkArray [10,20..100]

f :: String -> IO ()
f from = forM_ [0..2]
    (\i -> putStrLn $ from ++ ":" ++ show i)

fac :: Integer -> Integer
fac 0 = 1
fac n = n * fac (n - 1)

addNumbers :: TVar Int -> TVar Int -> IO Int
addNumbers var1 var2 = do
    lock <- newMVar ()

    forkIO $ atomically $ do
        val1 <- readTVar var1
        writeTVar var1 (val1 + 1)

    forkIO $ atomically $ do
        val2 <- readTVar var2
        writeTVar var2 (val2 + 2)

    atomically $ do
        val1 <- readTVar var1
        val2 <- readTVar var2
        return (val1 + val2)

goroutine f_ptr = do
    -- forkIO $ f 1
    msg1 <- atomically newTQueue
    msg2 <- atomically newTQueue
    forkIO $ do
        atomically $ writeTQueue msg1 "ping"
    forkIO $ do
        atomically $ writeTQueue msg2 "pong"
    _ <- atomically $ readTQueue msg1
    _ <- atomically $ readTQueue msg2
    f 3
    putStrLn "Done!"

    var1 <- atomically $ newTVar 0
    var2 <- atomically $ newTVar 100

    intToCInt <$> addNumbers var1 var2

    -- return 1
    where
        f = mkFun f_ptr

intToCInt :: Int -> CInt
intToCInt = fromIntegral
{-# INLINE intToCInt #-}

timer ptr t = do
    msg <- atomically newTQueue
    forkIO $ do
        threadDelay (t * 1000000)
        f (intToCInt t)
        atomically $ writeTQueue msg "ping"
    _ <- atomically $ readTQueue msg
    putStrLn "Done!"
    where
        f = mkFun ptr

c_eval s r f_ptr = do
    cs <- peekCAString s
    -- f 42
    case hs_eval cs of
        Nothing -> return nullPtr
        Just x -> do
            poke r x
            return r
    where
        f = mkFun f_ptr

hs_eval :: String -> Maybe CInt
hs_eval inp = case readP_to_S expr inp of
    (a,_) : _ -> Just a
    []        -> Nothing

expr = addition <* expect EOF

addition = chainl1 multiplication add
  where
    add = expect (Symbol "+") >> return (+)

multiplication = chainl1 atom mul
  where
    mul = expect (Symbol "*") >> return (*)

atom = number <|> between lp rp addition

number = do
    Number n <- lex
    case numberToInteger n of
        Just i  -> return (fromIntegral i)
        Nothing -> pfail

lp = expect (Punc "(")
rp = expect (Punc ")")

main :: IO ()
main = undefined
